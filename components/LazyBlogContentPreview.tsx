import { useEffect, useState, useRef } from "react";
import { marked } from "marked";

interface LazyBlogContentPreviewProps {
  blogId: string;
  permalink: string;
  maxLength?: number;
  skeletonLines?: number;
}

const LazyBlogContentPreview = ({ 
  blogId, 
  permalink, 
  maxLength = 200,
  skeletonLines = 3
}: LazyBlogContentPreviewProps) => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchBlogContent = async () => {
      try {
        const response = await fetch(`/api/blogs/${permalink}`);
        if (response.ok) {
          const blogData = await response.json();
          
          if (blogData?.content?.articleContent) {
            // Parse markdown and extract text content
            const htmlContent = await marked.parse(blogData.content.articleContent);
            
            // Create a temporary element to extract text from HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const textContent = tempDiv.textContent || tempDiv.innerText || '';
            
            // Truncate content
            const truncatedContent = textContent.length > maxLength 
              ? textContent.substring(0, maxLength).trim() + "..."
              : textContent;
            
            setContent(truncatedContent);
          }
        }
      } catch (error) {
        console.error('Error fetching blog content:', error);
        setContent("Content preview unavailable...");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogContent();
  }, [isVisible, permalink, maxLength]);

  const ContentSkeleton = () => {
    const lines = Array.from({ length: skeletonLines }, (_, index) => {
      let width = "w-full";
      if (index === skeletonLines - 1) {
        width = "w-4/6"; // Last line is shorter
      } else if (index === skeletonLines - 2 && skeletonLines > 2) {
        width = "w-5/6"; // Second to last line is medium
      }
      
      return (
        <div key={index} className={`h-4 bg-gray-200 rounded ${width}`}></div>
      );
    });

    return (
      <div className="animate-pulse space-y-2">
        {lines}
      </div>
    );
  };

  return (
    <div ref={ref} className="mt-3">
      {isVisible && (
        <>
          {isLoading ? (
            <ContentSkeleton />
          ) : (
            <p className="text-base text-gray-600 leading-relaxed">
              {content}
            </p>
          )}
        </>
      )}
      {!isVisible && <ContentSkeleton />}
    </div>
  );
};

export default LazyBlogContentPreview; 