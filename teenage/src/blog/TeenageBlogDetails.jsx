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
  ChevronUp,
  ThumbsUp,
  TrendingUp,
  Repeat
} from 'lucide-react';

export default function TeenageBlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openFaqs, setOpenFaqs] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  const toggleFaq = (index) => {
    setOpenFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        console.log("Fetching blog with slug:", slug);
        
        const res = await axiosInstance.get(`/teenage-blogs/${slug}`);
        console.log("API Response:", res.data);
        
        let blogData = null;
        if (res.data && res.data.success) {
          blogData = res.data.blog || res.data.data;
        } else {
          blogData = res.data;
        }
        
        if (!blogData) {
          console.error("No blog data received");
          setBlog(null);
          setLoading(false);
          return;
        }
        
        console.log("Blog data:", blogData);
        console.log("FAQs:", blogData.faqs);
        setBlog(blogData);
        
        await fetchAllBlogs(blogData);
        
      } catch (error) {
        console.error("Error fetching blog:", error);
        console.error("Error details:", error.response?.data);
        setBlog(null);
        setLoading(false);
      }
    };

    const fetchAllBlogs = async (currentBlog) => {
      try {
        const allBlogsRes = await axiosInstance.get("/teenage-blogs");
        console.log("All blogs response:", allBlogsRes.data);
        
        let blogsArray = [];
        if (Array.isArray(allBlogsRes.data)) {
          blogsArray = allBlogsRes.data;
        } else if (allBlogsRes.data && allBlogsRes.data.success) {
          blogsArray = allBlogsRes.data.data || [];
        } else {
          blogsArray = [];
        }
        
        const otherBlogs = blogsArray.filter(post => post.slug !== slug);
        setAllBlogs(otherBlogs);
        
        const popular = [...otherBlogs]
          .sort((a, b) => (parseInt(b.views) || 0) - (parseInt(a.views) || 0))
          .slice(0, 3);
        setPopularPosts(popular);
        
        let related = [];
        
        const sameCategory = otherBlogs.filter(post => 
          post.category === currentBlog.category
        );
        
        const sameTags = otherBlogs.filter(post => 
          post.category !== currentBlog.category &&
          post.tags && 
          post.tags.length > 0 &&
          currentBlog.tags && 
          currentBlog.tags.length > 0 &&
          post.tags.some(tag => currentBlog.tags.includes(tag))
        );
        
        related = [...sameCategory, ...sameTags];
        
        const uniqueRelated = [];
        const seenIds = new Set();
        for (const post of related) {
          if (!seenIds.has(post._id)) {
            seenIds.add(post._id);
            uniqueRelated.push(post);
          }
        }
        
        let finalRelated = uniqueRelated.slice(0, 5);
        if (finalRelated.length < 5 && popular.length > 0) {
          const additionalPosts = popular.filter(
            post => !finalRelated.some(r => r._id === post._id)
          ).slice(0, 5 - finalRelated.length);
          finalRelated = [...finalRelated, ...additionalPosts];
        }
        
        setRelatedPosts(finalRelated);
        console.log("Related posts with images:", finalRelated);
        
      } catch (error) {
        console.error("Error fetching related posts:", error);
        setRelatedPosts([]);
        setPopularPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLike = async () => {
    if (!blog || !blog._id) return;
    
    try {
      const res = await axiosInstance.post(`/teenage-blogs/${blog._id}/like`);
      if (res.data && res.data.success) {
        setLiked(!liked);
        setBlog({ ...blog, likes: (blog.likes || 0) + (liked ? -1 : 1) });
      }
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleShare = async (platform) => {
    if (!blog) return;
    
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
    // Navigate to the blog detail page using the slug
    navigate(`/blog/${relatedPost.slug}`);
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFallbackImage = (category) => {
    const fallbackImages = {
      "Health": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3",
      "Study": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3",
      "Lifestyle": "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3",
      "Mental Health": "https://images.unsplash.com/photo-1541199249251-f713e6145474?ixlib=rb-4.0.3",
      "default": "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3"
    };
    return fallbackImages[category] || fallbackImages.default;
  };

  const getReadTime = (content) => {
    if (!content) return "5 min read";
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    const readTime = Math.ceil(words / 200);
    return `${readTime || 5} min read`;
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
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

      {/* Back Button */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-700 transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Teen Blog</span>
          </Link>
        </div>
      </div>

      {/* Hero Section - Responsive */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blog.image || getFallbackImage(blog.category)}
            alt={blog.title}
            className="w-full h-full object-cover transform scale-105"
            style={{ transform: `translateY(${scrollProgress * 0.5}px)` }}
            onError={(e) => {
              e.target.src = getFallbackImage(blog.category);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative h-full flex items-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold">
                {blog.category || "Teen Health"}
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Eye size={12} sm:size={14} /> {blog.views || "0"} views
              </span>
              <span className="text-white/80 text-xs flex items-center gap-1">
                <Heart size={12} sm:size={14} /> {blog.likes || "0"} likes
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
              {blog.title}
            </h1>
            <p className="text-sm sm:text-base text-white/80 mt-1 sm:mt-2 line-clamp-3 leading-relaxed">
              {blog.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Left Side - Main Content */}
          <div className="lg:w-2/3 w-full">
            {/* Author Info */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 shadow-sm border border-blue-100 mb-4 sm:mb-6">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold shadow-md">
                  {blog.author?.charAt(0) || "T"}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">About the Author</h3>
                  <p className="text-xs sm:text-sm font-medium text-blue-700">{blog.author || "Teen Health Expert"}</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                Expert in {blog.category || "teen wellness"} with years of experience helping teenagers navigate challenges.
              </p>
            </div>

            {/* Article Content with Overflow Fix */}
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 overflow-x-auto">
              <div className="prose prose-sm sm:prose-base max-w-none
                            prose-headings:font-bold prose-headings:text-gray-800
                            prose-h1:text-xl sm:prose-h1:text-2xl md:prose-h1:text-3xl
                            prose-h2:text-lg sm:prose-h2:text-xl md:prose-h2:text-2xl
                            prose-p:text-sm sm:prose-p:text-base prose-p:text-gray-700 prose-p:leading-relaxed
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-800
                            prose-img:rounded-xl prose-img:shadow-md prose-img:max-w-full prose-img:h-auto
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                            prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 sm:prose-blockquote:px-6 
                            prose-blockquote:italic prose-blockquote:text-gray-600
                            prose-ul:pl-4 sm:prose-ul:pl-6
                            prose-ol:pl-4 sm:prose-ol:pl-6
                            prose-li:text-sm sm:prose-li:text-base
                            prose-table:overflow-x-auto prose-table:block
                            prose-pre:overflow-x-auto
                            [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg
                            [&_iframe]:max-w-full [&_iframe]:h-auto
                            [&_video]:max-w-full [&_video]:h-auto
                            break-words">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>
            </div>

            {/* FAQ Section */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 mt-4 sm:mt-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg">
                    <HelpCircle className="text-blue-600" size={20} sm:size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">Find answers to common questions</p>
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  {blog.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-200 transition-colors">
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full px-3 sm:px-5 py-3 sm:py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800 text-sm sm:text-base pr-2 sm:pr-4">{faq.question}</span>
                        {openFaqs.includes(index) ? (
                          <ChevronUp size={18} sm:size={20} className="text-blue-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={18} sm:size={20} className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {openFaqs.includes(index) && (
                        <div className="px-3 sm:px-5 pb-3 sm:pb-4 pt-2 bg-gray-50 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Section */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mt-4 sm:mt-6">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Tag size={14} sm:size={16} />
                  Related Topics
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-xs cursor-pointer transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Related Blogs with Images and Responsive Design */}
          <div className="lg:w-1/3 w-full">
            <div className="sticky top-24 space-y-4 sm:space-y-6">
              {/* Share Options */}
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <Share2 size={16} sm:size={18} />
                  Share this article
                </h3>
                <div className="flex gap-2">
                  <button onClick={() => handleShare('facebook')} className="flex-1 bg-blue-600 text-white py-2 sm:py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Facebook size={14} sm:size={16} /> Share
                  </button>
                  <button onClick={() => handleShare('twitter')} className="flex-1 bg-sky-500 text-white py-2 sm:py-2.5 rounded-lg hover:bg-sky-600 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                    <Twitter size={14} sm:size={16} /> Tweet
                  </button>
                </div>
              </div>

              {/* Like Button */}
              <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                <button 
                  onClick={handleLike}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    liked ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-red-100'
                  }`}
                >
                  <Heart size={16} sm:size={20} fill={liked ? "white" : "none"} />
                  <span>{liked ? 'Liked' : 'Like'} ({blog.likes || 0})</span>
                </button>
              </div>

              {/* Related Articles Section with Images - Responsive */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-3 sm:p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                      <Repeat size={16} sm:size={18} className="text-blue-600" />
                      Related Articles
                    </h3>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {relatedPosts.slice(0, 5).map((relatedPost, idx) => (
                      <div 
                        key={relatedPost._id || idx} 
                        onClick={() => handleRelatedPostClick(relatedPost)} 
                        className="p-3 sm:p-4 cursor-pointer hover:bg-gray-50 transition-all duration-200 group"
                      >
                        {/* Image and Content Row */}
                        <div className="flex gap-3">
                          {/* Image */}
                          <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={relatedPost.image || getFallbackImage(relatedPost.category)} 
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = getFallbackImage(relatedPost.category);
                              }}
                            />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
                              <span className="text-[10px] sm:text-xs font-medium text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded">
                                {relatedPost.category || "Article"}
                              </span>
                              <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-0.5 sm:gap-1">
                                <Clock size={10} sm:size={12} />
                                {getReadTime(relatedPost.content)}
                              </span>
                            </div>
                            
                            <h4 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors break-words">
                              {relatedPost.title}
                            </h4>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-[8px] sm:text-[10px] font-bold flex-shrink-0">
                                  {relatedPost.author?.charAt(0) || "A"}
                                </div>
                                <span className="text-[10px] sm:text-xs text-gray-600 truncate">
                                  {relatedPost.author || "Author"}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                                <Repeat size={10} sm:size={12} />
                                <span className="text-[10px] sm:text-xs">0</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-2 sm:p-3 border-t border-gray-100 text-center bg-gray-50">
                    <Link 
                      to="/blog" 
                      className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 transition-colors group"
                    >
                      View All Articles 
                      <ChevronRight size={12} sm:size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Popular Posts Section */}
              {popularPosts.length > 0 && relatedPosts.length === 0 && (
                <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp size={16} sm:size={18} className="text-orange-500" />
                    Popular Articles
                  </h3>
                  <div className="space-y-3">
                    {popularPosts.slice(0, 3).map((post) => (
                      <div 
                        key={post._id}
                        onClick={() => handleRelatedPostClick(post)}
                        className="cursor-pointer group flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 overflow-hidden rounded-lg">
                          <img 
                            src={post.image || getFallbackImage(post.category)} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = getFallbackImage(post.category);
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-blue-700 line-clamp-2 break-words">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                            <span className="text-[10px] text-gray-500 truncate">{post.author}</span>
                            <span className="text-[10px] text-gray-400">•</span>
                            <div className="flex items-center gap-0.5 sm:gap-1">
                              <Eye size={10} className="text-gray-400" />
                              <span className="text-[10px] text-gray-500">{post.views || 0}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 shadow-sm border border-blue-100">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Subscribe for Teen Updates</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">Get weekly tips on teen health, study strategies, and wellness.</p>
                <div className="flex flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Subscribe Now
                  </button>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-2">No spam, unsubscribe anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add responsive CSS for content overflow */}
      <style jsx>{`
        @media (max-width: 640px) {
          .prose pre {
            max-width: 100%;
            overflow-x: auto;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .prose table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
}