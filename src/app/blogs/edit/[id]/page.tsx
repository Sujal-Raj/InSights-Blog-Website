"use client"
import NavbarAfterLogin from '@/app/components/NavbarAfterLogin'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Blog {
    _id: string;
    title: string;
    content: string;
    category?: string;
    publishedAt: string;
    imageUrl: string;
    createdAt: string;
    username: string;
}

function BlogEditingPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        imageUrl: ""
    });

    // Preview image state
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (id) {
            fetchMyBlog(id);
        }
    }, [id]);

    const fetchMyBlog = async (blogId: string) => {
        try {
            const response = await axios.get(`/api/blog/find/${blogId}`);
            // console.log(response.data);
            const blogData = response.data;
            setBlog(blogData);
            
            // Initialize form data with blog data
            setFormData({
                title: blogData.title || "",
                content: blogData.content || "",
                category: blogData.category || "",
                imageUrl: blogData.imageUrl || ""
            });
            
            // Set image preview
            if (blogData.imageUrl) {
                setImagePreview(blogData.imageUrl);
            }
            
            setLoading(false);
        } catch (error: any) {
            console.error("Error fetching blog:", error.message);
            setError("Failed to load blog.");
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Preview image
        const objectUrl = URL.createObjectURL(selectedFile);
        setImagePreview(objectUrl);
        setFile(selectedFile);
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     setError(null);
    //     setSuccessMessage(null);

    //     try {
    //         // Create FormData object for file upload
    //         const updateData = new FormData();
    //         updateData.append("title", formData.title);
    //         updateData.append("content", formData.content);
    //         updateData.append("category", formData.category || "");
            
    //         // Only append file if a new one was selected
    //         if (file) {
    //             updateData.append("image", file);
    //         } else {
    //             // Keep existing image URL
    //             updateData.append("imageUrl", formData.imageUrl);
    //         }

    //         // Send update request
    //         const response = await axios.put(`/api/blog/update/${id}`, updateData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });

    //         setSuccessMessage("Blog updated successfully!");
    //         setTimeout(() => {
    //             router.push("/dashboard"); // Redirect to dashboard after success
    //         }, 2000);
    //     } catch (error: any) {
    //         console.error("Error updating blog:", error.message);
    //         setError(error.response?.data?.message || "Failed to update blog. Please try again.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
    
        try {
            // Create FormData object for file upload
            const updateData = new FormData();
            updateData.append("title", formData.title);
            updateData.append("content", formData.content);
            updateData.append("category", formData.category || "");
            
            // Only append file if a new one was selected
            if (file) {
                updateData.append("image", file);
            } else {
                // Keep existing image URL
                updateData.append("imageUrl", formData.imageUrl);
            }
    
            // Send update request
            const response = await axios.put(`/api/blog/update/${id}`, updateData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            setSuccessMessage("Blog updated successfully!");
            alert("Blog updated successfully!");
            setTimeout(() => {
                router.push("/my-blogs"); // Redirect to dashboard after success
            }, 1000);
        } catch (error: any) {
            console.error("Error updating blog:", error.message);
            setError(error.response?.data?.error || "Failed to update blog. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <>
                <div className="min-h-[10vh]">
                    <NavbarAfterLogin />
                </div>
                <div className="flex justify-center items-center min-h-[80vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            </>
        );
    }

    if (error && !blog) {
        return (
            <>
                <div className="min-h-[10vh]">
                    <NavbarAfterLogin />
                </div>
                <div className="flex justify-center items-center min-h-[80vh]">
                    <p className="text-center mt-10 text-red-500">{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-[10vh] relative z-20">
                <NavbarAfterLogin />
            </div>
            <section className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center flex-col py-5 gap-2">
          <h2 className="text-4xl font-semibold">Edit Blog</h2>
          <p className="text-gray-400 underline">Make changes to your blog post</p>
        </div>

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                        {successMessage}
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 p-6 rounded-lg shadow-md">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-white mb-1">
                            Category:
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md  text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-white mb-1">
                            Featured Image:
                        </label>
                        <div className="mb-3">
                            {imagePreview && (
                                <div className="relative h-48 w-full rounded-md overflow-hidden mb-3">
                                    <Image 
                                        src={imagePreview} 
                                        alt="Blog preview" 
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                    />
                                </div>
                            )}
                        </div>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <p className="text-sm text-gray-500 mt-1">Leave empty to keep the current image</p>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-white mb-1">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            rows={12}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? 'Updating...' : 'Update Blog'}
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => router.push('/my-blogs')}
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default BlogEditingPage