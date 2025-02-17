import { Star } from "lucide-react"
import { Card, CardContent } from "./ui/card"
import { MovieDetails } from "@/lib/types"

function MovieShowcase({movies} : {movies: MovieDetails[]}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.length === 0 && (
        <div className="text-center col-span-full">
          <p>No movies found</p>
          </div>
          )}
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="bg-white overflow-hidden rounded-md shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="aspect-[2/3] relative overflow-hidden">
                  <img
                    src={
                      movie.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                        : movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "/placeholder.svg"
                    }
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="text-white text-center p-4">
                      <p className="font-bold">{movie.release_date}</p>
                      <div className="flex items-center justify-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>{movie.vote_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h2 className="text-sm font-semibold truncate">{movie.title}</h2>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  )
}

export default MovieShowcase