"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogCategory } from '@/types/blog';

// أنواع البيانات للملف الشخصي
interface UserProfileProps {
  userId: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  isVerified?: boolean;
  stats: {
    posts: number;
    likes: number;
    comments: number;
    followers?: number;
    following?: number;
  };
  userPosts?: BlogPost[];
  isCurrentUser?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  category: BlogCategory;
  createdAt: string;
  likes: number;
  comments: number;
  featuredImage?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  username,
  displayName,
  avatar,
  bio,
  joinDate,
  isVerified = false,
  stats,
  userPosts = [],
  isCurrentUser = false,
}) => {
  // تاريخ الانضمام للتنسيق العربي
  const formattedJoinDate = new Date(joinDate).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* غلاف الملف الشخصي */}
      <div className="h-40 bg-gradient-to-r from-amber-500 to-amber-600 relative">
        <div className="absolute -bottom-16 right-8">
          <div className="relative h-32 w-32 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
            {avatar ? (
              <Image 
                src={avatar} 
                alt={displayName} 
                fill 
                className="object-cover"
                sizes="128px"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-amber-100 text-amber-800 text-4xl font-bold">
                {displayName.charAt(0)}
              </div>
            )}
          </div>
          {isVerified && (
            <div className="absolute bottom-0 left-0 bg-blue-500 rounded-full p-1 transform translate-x-1/4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* معلومات المستخدم */}
      <div className="pt-20 px-8 pb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">{displayName}</h1>
            <p className="text-gray-600">@{username}</p>
            <p className="text-sm text-gray-500 mt-1">
              انضم في {formattedJoinDate}
            </p>
          </div>
          
          {isCurrentUser ? (
            <Link href="/blog/profile/edit" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              تعديل الملف الشخصي
            </Link>
          ) : (
            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              متابعة
            </button>
          )}
        </div>

        {bio && (
          <div className="mt-4 mb-6">
            <p className="text-gray-700">{bio}</p>
          </div>
        )}

        {/* إحصائيات المستخدم */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 rounded-lg p-3 mb-8">
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.posts}</p>
            <p className="text-sm text-gray-600">منشورات</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.likes}</p>
            <p className="text-sm text-gray-600">إعجابات</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.comments}</p>
            <p className="text-sm text-gray-600">تعليقات</p>
          </div>
          {stats.followers !== undefined && (
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{stats.followers}</p>
              <p className="text-sm text-gray-600">متابعين</p>
            </div>
          )}
          {stats.following !== undefined && (
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{stats.following}</p>
              <p className="text-sm text-gray-600">متابَعين</p>
            </div>
          )}
        </div>

        {/* أحدث المنشورات */}
        {userPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">أحدث المنشورات</h2>
            <div className="space-y-4">
              {userPosts.map(post => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-amber-300 transition-colors">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      {post.featuredImage && (
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image 
                            src={post.featuredImage} 
                            alt={post.title} 
                            width={80} 
                            height={80} 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="font-bold mb-1 line-clamp-2">{post.title}</h3>
                        {post.summary && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.summary}</p>
                        )}
                        <div className="flex items-center text-xs text-gray-500 space-x-3 rtl:space-x-reverse">
                          <span className="capitalize">
                            {post.category}
                          </span>
                          <span>•</span>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {post.likes}
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            {post.comments}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {userPosts.length >= 5 && (
              <div className="text-center mt-4">
                <Link href={`/blog/profile/${username}/posts`} className="inline-flex items-center text-amber-600 hover:text-amber-700">
                  عرض كل المنشورات
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
