import { Product } from "../models/product.model.js";

const items = [
  {
    name: "Notion Life Planner Template",
    price: 15,
  },
  {
    name: "E-book",
    price: 19,
  },
  {
    name: "Lightroom Photo Preset Pack",
    price: 25,
  },
  {
    name: "UI/UX Mobile Design Kit",
    price: 49,
  },
  {
    name: "Canva Social Media Template Bundle",
    price: 29,
  },
  {
    name: "Procreate Brush Pack",
    price: 12,
  },
  {
    name: "Stock Photo Pack",
    price: 35,
  },
  {
    name: "Wordpress Theme",
    price: 59,
  },
  {
    name: "Resumes & Cover Letter Template",
    price: 10,
  },
  {
    name: "Online Video Course",
    price: 99,
  },
  {
    name: "Lo-Fi Royalty-Free Beat Pack",
    price: 30,
  },
  {
    name: "Excel Automated Budget Tracker",
    price: 18,
  },
  {
    name: "Custom Font Family",
    price: 22,
  },
  {
    name: "3D Character Model for Games",
    price: 45,
  },
  {
    name: "Digital Printable Wall Art",
    price: 7,
  },
  {
    name: "Sound Effects (SFX) Sound Pack",
    price: 15,
  },
  {
    name: "Email Marketing Swipe Files",
    price: 27,
  },
  {
    name: "Acapella Vocals Sample Pack",
    price: 20,
  },
  {
    name: "GoodNotes Digital Daily Planner",
    price: 14,
  },
  {
    name: "Shopify Store Theme",
    price: 180,
  },
  {
    name: "Photoshop Mockup Set",
    price: 16,
  },
  {
    name: "ChatGPT Prompt Engineering Library",
    price: 15,
  },
  {
    name: "Motion Graphics Transitions Pack",
    price: 35,
  },
  {
    name: "Digital Meal Prep & Recipe Book",
    price: 12,
  },
  {
    name: "Podcast Intro Audio & Jingle",
    price: 40,
  },
  {
    name: "Tailwind CSS UI Component Library",
    price: 79,
  },
  {
    name: "Lut Pack for Video Color Grading",
    price: 29,
  },
  {
    name: "Digital Habit Tracker App",
    price: 5,
  },
  {
    name: "Printable Fitness Workout Journal",
    price: 9,
  },
  {
    name: "Subtitles & Captions SRT File Service",
    price: 10,
  },
  {
    name: "Vector Icon Set",
    price: 24,
  },
  {
    name: "Architectural 3D CAD Floor Plans",
    price: 150,
  },
  {
    name: "Printable Homeschool Worksheet Pack",
    price: 11,
  },
  {
    name: "Twitch Stream Overlay & Banner Package",
    price: 30,
  },
  {
    name: "Midjourney AI Prompt Guide",
    price: 10,
  },
  {
    name: "Webflow Landing Page Template",
    price: 49,
  },
  {
    name: "Digital Knitting / Crochet Pattern",
    price: 6,
  },
  {
    name: "DAW Synth Preset Pack",
    price: 20,
  },
  {
    name: "Google Sheets CRM Tool",
    price: 39,
  },
  {
    name: "Wedding Invitation Editable Template Set",
    price: 18,
  },
  {
    name: "Copywriting Sales Page Framework",
    price: 47,
  },
  {
    name: "Stock Video B-Roll Pack",
    price: 50,
  },
  {
    name: "Guided Meditation Audio Track",
    price: 8,
  },
  {
    name: "3D Printing STL Model File",
    price: 8,
  },
  {
    name: "Digital Sticker Pack for GoodNotes",
    price: 5,
  },
  {
    name: "SEO Audit Checklist & SOP",
    price: 25,
  },
  {
    name: "Pitch Deck PowerPoint Presentation",
    price: 32,
  },
  {
    name: "OBS Studio Transitions & Filters",
    price: 15,
  },
  {
    name: "Discord Server Setup Template",
    price: 20,
  },
  {
    name: "Interactive Audiobook",
    price: 22,
  },
];

const createProduct = async (req, res) => {
  try {
    const { name, price, description, quantity } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required!" });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      quantity,
    });

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to create product",
      error: error.message,
    });
  }
};

//FIXME: My pagination ref: https://medium.com/@atacanymc/implementing-pagination-in-an-express-js-application-551244b62d48

const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const startIndex = (page - 1) * limit; // which number of index to start
    const total = await Product.countDocuments();
    const totalPage = total/limit

    // TODO: we are creating dummy data for testing our pagination
    await Product.deleteMany({});
    for (let i = 0; i < items.length; i++) {
      let product = items[i];

      await Product.create({
        name: product.name,
        price: product.price,
        description: "This is a product description",
        quantity: i + 1,
      });
    }

    const products = await Product.find()
      .sort({_id: 1}) // not necessary but good practice for data consistency
      .skip(startIndex) // skip given number of documents
      .limit(limit)   // how much documents you should get

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPage,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to fetch products",
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      Error: "Failed to delete product",
      error: error.message,
    });
  }
};

export { createProduct, getAllProducts, updateProduct, deleteProduct };
