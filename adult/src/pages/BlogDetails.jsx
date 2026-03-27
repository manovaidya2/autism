import React from "react";
import { useParams, Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Understanding Autism in Children",
    date: "Jan 10, 2026",
    author: "Manovaidya Team",
    content: `
Autism Spectrum Disorder (ASD) is a developmental condition that affects communication, behavior, and social interaction.

Early signs may include delayed speech, limited eye contact, and repetitive behaviors.

Early diagnosis and therapy can significantly improve outcomes and help children lead fulfilling lives.
    `,
  },
  {
    id: 2,
    title: "ADHD: Symptoms, Causes, and Treatment",
    date: "Jan 15, 2026",
    author: "Dr. Sharma",
    content: `
ADHD is a neurodevelopmental disorder characterized by inattention, hyperactivity, and impulsivity.

Treatment options include behavioral therapy, parent training, and in some cases, medication.

With the right support, children with ADHD can succeed academically and socially.
    `,
  },
  {
    id: 3,
    title: "How Therapy Helps Neurodivergent Kids",
    date: "Jan 20, 2026",
    author: "Manovaidya Experts",
    content: `
Therapy plays a crucial role in supporting neurodivergent children.

Occupational, speech, and behavioral therapies help improve daily functioning, communication, and emotional regulation.

Consistency and parental involvement are key to successful outcomes.
    `,
  },
];

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Blog not found.</p>
        <Link to="/blogs" className="text-green-700 underline">
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <section className="bg-white py-10">
      <div className="max-w-3xl mx-auto px-6">
       
        <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">
          {blog.title}
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          {blog.date} · {blog.author}
        </p>

        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.content}
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
