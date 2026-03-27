import React, { useEffect, useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { 
  Calendar, 
  Clock, 
  ArrowLeft,
  Heart,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  User,
  Tag,
  ChevronRight,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sidebarOffset, setSidebarOffset] = useState(0);
  const [openFaqs, setOpenFaqs] = useState([]);
  const sidebarRef = useRef(null);
  const sidebarContainerRef = useRef(null);
  const mainContentRef = useRef(null);

  // Toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
// In BlogDetails component
const res = await axiosInstance.get(`/blogs/slug/${slug}`);
        setBlog(res.data);
        
        // Fetch related posts based on category
        if (res.data?.category) {
          try {
            const relatedRes = await axiosInstance.get(`/blogs?category=${res.data.category}&limit=4`);
            setRelatedPosts(relatedRes.data.filter(post => post.slug !== slug));
          } catch (error) {
            console.error("Error fetching related posts:", error);
          }
        }
      } catch (error) {
        console.error("Blog not found", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Scroll progress indicator and sidebar sticky logic
  useEffect(() => {
    const handleScroll = () => {
      // Scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);

      // Sidebar sticky logic
      if (sidebarContainerRef.current && mainContentRef.current) {
        const sidebarContainer = sidebarContainerRef.current;
        const sidebar = sidebarRef.current;
        
        if (sidebar) {
          const containerRect = sidebarContainer.getBoundingClientRect();
          const sidebarHeight = sidebar.offsetHeight;
          const viewportHeight = window.innerHeight;
          
          // Calculate the offset when sidebar should become sticky
          const stickyTop = 100; // Distance from top when sticky
          
          if (containerRect.top <= stickyTop) {
            // Check if we've scrolled past the sidebar container
            const scrollableDistance = sidebarContainer.parentElement.offsetHeight - sidebarHeight;
            const scrolled = Math.abs(containerRect.top);
            
            if (scrolled < scrollableDistance) {
              setSidebarOffset(Math.min(scrolled - stickyTop, 0));
            } else {
              setSidebarOffset(-(scrollableDistance - stickyTop));
            }
          } else {
            setSidebarOffset(0);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [blog]);

  const handleLike = async () => {
    if (!blog) return;
    try {
      if (!liked) {
        await axiosInstance.post(`/blogs/${blog.id}/like`);
        setBlog({ ...blog, likes: (blog.likes || 0) + 1 });
      } else {
        await axiosInstance.delete(`/blogs/${blog.id}/like`);
        setBlog({ ...blog, likes: (blog.likes || 0) - 1 });
      }
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = blog.title;
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        break;
      default:
        if (navigator.share) {
          await navigator.share({ title, url });
        } else {
          navigator.clipboard.writeText(url);
          alert('Link copied to clipboard!');
        }
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleRelatedPostClick = (relatedPost) => {
    navigate(`/blog/${relatedPost.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Explore Other Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Back Button - Sticky */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transform scale-105"
            style={{ transform: `translateY(${scrollProgress * 0.5}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {blog.category || "Education"}
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Eye size={14} /> {blog.views || "0"} views
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Heart size={14} /> {blog.likes || "0"} likes
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
              {blog.title}
            </h1>
            <p className="text-medium text-white/80 mt-2 line-clamp-3 leading-relaxed">
              {blog.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 relative" ref={mainContentRef}>
          {/* Left Side - Main Article (Scrollable) */}
          <div className="lg:w-2/3">
            {/* Author Info */}
                   <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-sm border border-blue-100 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md">
                    {blog.author?.charAt(0) || "A"}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">About the Author</h3>
                    <p className="text-sm font-medium text-blue-700">{blog.author || "Editorial Team"}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Expert in {blog.category || "education"} with 9+ years of experience helping students achieve their academic goals.
                </p>
                <div className="flex gap-2 pt-2 border-t border-blue-100">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} /> Joined 2020
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <BookOpen size={12} /> {blog.faqs?.length || 0} Articles
                  </span>
                </div>
              </div>

            {/* Article Content */}
            <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100">
              <div className="prose prose-sm md:prose-base max-w-none
                            prose-headings:font-bold prose-headings:text-gray-800
                            prose-h1:text-2xl md:prose-h1:text-3xl
                            prose-h2:text-xl md:prose-h2:text-2xl
                            prose-p:text-gray-700 prose-p:leading-relaxed
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-800
                            prose-img:rounded-xl prose-img:shadow-md
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                            prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-6 
                            prose-blockquote:italic prose-blockquote:text-gray-600
                            first-letter:text-4xl first-letter:font-bold first-letter:text-blue-600
                            first-letter:mr-2 first-letter:float-left">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </div>

            {/* FAQ Section */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <HelpCircle className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-gray-600 text-sm mt-1">Find answers to common questions about this topic</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {blog.faqs.map((faq, index) => (
                    <div 
                      key={index} 
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-200 transition-colors"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-5 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </span>
                        {openFaqs.includes(index) ? (
                          <ChevronUp size={20} className="text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaqs.includes(index) && (
                        <div className="px-5 pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag size={16} />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-xs cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Always Sticky */}
          <div className="lg:w-1/3">
            <div 
              ref={sidebarRef}
              className="sticky top-24"
              style={{
                top: '6rem',
                maxHeight: 'calc(100vh - 8rem)',
                overflowY: 'auto'
              }}
            >
              {/* Author Details Card */}
     

              {/* Share Options */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Share2 size={16} />
                  Share this article
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleShare('facebook')}
                    className="flex-1 bg-blue-600 text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Facebook size={16} />
                    Share
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')}
                    className="flex-1 bg-sky-500 text-white p-2.5 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Twitter size={16} />
                    Tweet
                  </button>
                </div>
              </div>

              {/* Related Blogs Section */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen size={18} />
                    Related Articles
                  </h3>
                  
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div
                        key={relatedPost.id}
                        onClick={() => handleRelatedPostClick(relatedPost)}
                        className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex gap-3">
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                            <img
                              src={relatedPost.image}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 p-2 pr-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                {relatedPost.category}
                              </span>
                              <span className="text-[10px] text-gray-500 flex items-center gap-1">
                                <Clock size={10} /> {relatedPost.readTime || "5 min"}
                              </span>
                            </div>
                            <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-700 transition-colors">
                              {relatedPost.title}
                            </h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-[10px] font-medium text-gray-600">{relatedPost.author}</span>
                              <div className="flex items-center gap-1 text-gray-400">
                                <Eye size={10} />
                                <span className="text-[10px]">{relatedPost.views || 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <Link
                      to="/blog"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
                    >
                      View All Articles
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Newsletter Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 shadow-sm border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2">Subscribe to Newsletter</h3>
                <p className="text-sm text-gray-600 mb-3">Get the latest study abroad tips directly in your inbox.</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}