const express = require("express");
const axios = require("axios");
const router = express.Router();
const constitution = require("../data/constitutionData");
const { askLegalAI } = require("../services/aiService");

require("dotenv").config();

const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

// GET /api/rights/search — Search articles
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q?.toLowerCase();

        if (!query) {
            return res.json([]);
        }

        const results = constitution.filter(
            (item) =>
                item.article.toLowerCase().includes(query) ||
                item.title.toLowerCase().includes(query) ||
                item.content.toLowerCase().includes(query) ||
                (item.category && item.category.toLowerCase().includes(query)) ||
                (item.subcategory && item.subcategory.toLowerCase().includes(query))
        );

        if (results.length === 0) {
            const aiResponse = await askLegalAI(query);
            return res.json([
                {
                    article: "AI Legal Search",
                    title: query,
                    content: aiResponse,
                    category: "AI Response",
                    subcategory: "Search Result",
                },
            ]);
        }

        // Return direct matches without AI enrichment for speed
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Search failed" });
    }
});

// GET /api/rights/categories — Get all categories
router.get("/categories", (req, res) => {
    const categories = {};

    constitution.forEach((item) => {
        const cat = item.category || "Other";
        if (!categories[cat]) {
            categories[cat] = {
                name: cat,
                count: 0,
                subcategories: new Set(),
            };
        }
        categories[cat].count++;
        if (item.subcategory) {
            categories[cat].subcategories.add(item.subcategory);
        }
    });

    const result = Object.values(categories).map((cat) => ({
        name: cat.name,
        count: cat.count,
        subcategories: Array.from(cat.subcategories),
    }));

    res.json(result);
});

// GET /api/rights/browse — Browse by category
router.get("/browse", (req, res) => {
    const category = req.query.category;
    const subcategory = req.query.subcategory;

    let results = constitution;

    if (category) {
        results = results.filter(
            (item) => item.category && item.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (subcategory) {
        results = results.filter(
            (item) => item.subcategory && item.subcategory.toLowerCase() === subcategory.toLowerCase()
        );
    }

    res.json(results);
});

// GET /api/rights/all — Get all articles
router.get("/all", (req, res) => {
    res.json(constitution);
});

// GET /api/rights/explain — AI explanation of an article
router.get("/explain", async (req, res) => {
    try {
        const article = req.query.article;

        if (!article) {
            return res.status(400).json({ error: "Article parameter required" });
        }

        const item = constitution.find(
            (c) => c.article.toLowerCase() === article.toLowerCase()
        );

        if (!item) {
            return res.status(404).json({ error: "Article not found" });
        }

        const explanation = await askLegalAI(
            `Explain ${item.article} - ${item.title} of the Indian Constitution in simple terms with real-world examples. Original text: ${item.content}`
        );

        res.json({
            ...item,
            aiExplanation: explanation,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Explanation failed" });
    }
});

// GET /api/rights/news — Fetch LIVE Indian legal news from NewsData.io
router.get("/news", async (req, res) => {
    try {
        const page = req.query.page || null;

        // Fetch live news from NewsData.io
        const params = {
            apikey: NEWSDATA_API_KEY,
            country: "in",
            language: "en",
            q: "Supreme Court OR High Court OR law OR legal OR amendment OR judiciary OR parliament bill",
            category: "politics",
        };

        if (page) {
            params.page = page;
        }

        const response = await axios.get("https://newsdata.io/api/1/latest", {
            params,
        });

        const articles = (response.data.results || []).map((article) => ({
            title: article.title,
            description: article.description,
            content: article.content,
            source: article.source_name || article.source_id,
            url: article.link,
            image: article.image_url,
            publishedAt: article.pubDate,
            category: article.category ? article.category.join(", ") : "Legal",
            creator: article.creator ? article.creator.join(", ") : null,
        }));

        res.json({
            success: true,
            totalResults: response.data.totalResults,
            nextPage: response.data.nextPage,
            articles,
        });
    } catch (error) {
        console.log("NewsData API Error:", error.response?.data || error.message);

        // Fallback to AI-generated news if API fails
        try {
            const aiNews = await askLegalAI(
                `List 6 important recent Indian legal news from 2024-2025 including Supreme Court judgments and new laws. For each: Title, Date, and 2-line Summary.`
            );
            res.json({
                success: true,
                fallback: true,
                articles: [
                    {
                        title: "AI-Generated Legal News Summary",
                        description: aiNews,
                        source: "Apka Vakeel AI",
                        publishedAt: new Date().toISOString(),
                        category: "Legal News",
                    },
                ],
            });
        } catch (fallbackError) {
            res.status(500).json({ error: "Failed to fetch news" });
        }
    }
});

module.exports = router;