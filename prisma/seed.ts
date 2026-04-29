import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: { email: "admin@danielfigueredo.com" },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        email: "admin@danielfigueredo.com",
        name: "Daniel Figueredo",
        password: await hashPassword("admin123"),
        role: "ADMIN",
      },
    });
    console.log("Admin user created: admin@danielfigueredo.com / admin123");
  }

  const products = [
    {
      title: "Custom Landing Page",
      slug: "custom-landing-page",
      description: "A stunning, conversion-focused single-page website tailored to your brand. Includes responsive design, SEO basics, and 2 rounds of revisions.",
      price: 450,
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    },
    {
      title: "AI Chatbot Integration",
      slug: "ai-chatbot-integration",
      description: "Deploy a custom AI agent on your website or WhatsApp to handle customer support, lead qualification, and FAQs 24/7.",
      price: 600,
      category: "AI Agents",
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    },
    {
      title: "AI Workflow Automation",
      slug: "ai-workflow-automation",
      description: "Connect your tools (CRM, Email, Sheets) with intelligent AI workflows. Reduce manual tasks by up to 80%.",
      price: 800,
      category: "AI Workflows",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      title: "Data Analysis Dashboard",
      slug: "data-analysis-dashboard",
      description: "Interactive analytics dashboard built with modern tools. Visualize KPIs, trends, and automated reports for your business.",
      price: 950,
      category: "Data Science",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    },
    {
      title: "E-Commerce Store Setup",
      slug: "ecommerce-store-setup",
      description: "Full-stack online store with cart, checkout, admin panel, and payment integration. Built with Next.js and modern tooling.",
      price: 1500,
      category: "Web Development",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    },
    {
      title: "AI Strategy Consultation",
      slug: "ai-strategy-consultation",
      description: "1-on-1 strategy session to identify where AI can drive the most value in your business. Includes a custom roadmap.",
      price: 250,
      category: "AI Workflows",
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
