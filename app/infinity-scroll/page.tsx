'use client';

import MovieShowcase from "@/components/MovieShowcase";
import { fetchMoviesWithPage, MovieResponse } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from 'react-intersection-observer';


function InfinityScroll() {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({ pageParam = 1 }) => fetchMoviesWithPage(pageParam),
    getNextPageParam: (lastPage: MovieResponse) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === 'pending') {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (status === 'error') {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  // console.log(data)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
    <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">MovieFlix</h1>
        </div>
      </div>
    </header>

    <main className="container mx-auto px-4 py-8">
        {data.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            <MovieShowcase movies={page.results} />
          </div>
        ))}
    </main>
    <div ref={ref} className="w-full p-4 text-center">
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load more'
          : 'No more movies to load'}
    </div>
  </div>
  )
}

export default InfinityScroll