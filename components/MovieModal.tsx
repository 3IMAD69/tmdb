"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, DollarSign, ThumbsUp, Users } from "lucide-react"
import { fetchMovieDetails } from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import LoadingMovieModal from "./LoadingMovieModal"

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(
    amount,
  )
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
}

interface MovieModalProps {
  movieId: number | null
  isOpen: boolean
  onClose: () => void
}


export function MovieModal({ movieId, isOpen, onClose }: MovieModalProps) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null)
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId!),
    enabled: !!movieId,
  })


  useEffect(() => {
    if (isOpen && movie) {
      console.log("inside useEffect")
      if (movie?.videos.results.length > 0) {
        console.log(movie.videos.results[0])
        setTrailerUrl(`https://www.youtube.com/embed/${movie.videos.results[0].key}`)
      }
      else
        setTrailerUrl("https://www.youtube.com/embed/dQw4w9WgXcQ")
    }
  }, [isOpen,movie])

  // if (isLoading) return <p>loading..</p>
  if (error)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>Error</DialogTitle>
          <p>Something went wrong</p>
        </DialogContent>
      </Dialog>
    )
  // if (!movie) return null // bad but ok for now
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {
        (isLoading || !movie)
        ?
            <LoadingMovieModal />
        :
        (
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold">{movie.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="aspect-video">
              {trailerUrl && (
                <iframe
                  width="100%"
                  height="100%"
                  src={trailerUrl}
                  title={`${movie.title} trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Badge key={genre.id} variant="secondary">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <p className="text-xl italic text-gray-600">{movie.tagline}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
                <span className="ml-1">({movie.vote_count} votes)</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{movie.runtime} min</span>
              </div>
            </div>
            <p className="text-gray-700">{movie.overview}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-semibold">Budget:</span>
                <span className="ml-2">{formatCurrency(movie.budget)}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-semibold">Revenue:</span>
                <span className="ml-2">{formatCurrency(movie.revenue)}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                <span className="font-semibold">Popularity:</span>
                <span className="ml-2">{movie.popularity.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="w-5 h-5 mr-2 text-red-600" />
                <span className="font-semibold">Status:</span>
                <span className="ml-2">{movie.status}</span>
              </div>
            </div>
            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Visit Official Website
              </a>
            )}
          </div>
        </DialogContent>
        )
      }

    </Dialog>
  )
}