import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import MovieShowcase from "@/components/MovieShowcase"
import { api, fetcher } from "@/lib/axios"
import { MovieDetails } from "@/lib/types"
import SearchInput from "@/components/SearchInput"
import { z } from "zod"


// i may need to validate other query params
const QuerySchema = z.object({
  name: z.string().default("").optional()
})

export default async function Home(
  {
    searchParams,
  }: {
    searchParams: Promise<Record<string, string | string[]>>;
  }
) {
  const params = await searchParams
  const validatedQuery = QuerySchema.safeParse(params)

  if (!validatedQuery.success) {
    console.log(validatedQuery.error.issues)
    return <div>Invalid query params</div> // TODO : do something
  }

  const endpoint = validatedQuery.data.name
                  ? `/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${validatedQuery.data.name}`
                  : `/movie/popular?api_key=${process.env.TMDB_API_KEY}`
  const {data  , error }  = await fetcher(api.get(endpoint))
  if (error) {
    console.error(error)
    return <div>Something went wrong</div>
  }
  const movies = data.results as MovieDetails[]
  console.log(movies)
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">MovieFlix</h1>
            <SearchInput />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <MovieShowcase movies={movies} />
      </main>
    </div>
  )
}

