import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Skeleton } from "./ui/skeleton"
import { Badge } from "./ui/badge"
import { Calendar, Clock, DollarSign, Star, ThumbsUp, Users } from "lucide-react"



function LoadingMovieModal() {
  return (
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            <Skeleton className="h-9 w-3/4" />
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="aspect-video">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((i) => (
              <Badge key={i} variant="secondary">
                <Skeleton className="h-4 w-16" />
              </Badge>
            ))}
          </div>
          <Skeleton className="h-6 w-3/4" />
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          <Skeleton className="h-20 w-full" />
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: DollarSign, label: "Budget:" },
              { icon: DollarSign, label: "Revenue:" },
              { icon: Users, label: "Popularity:" },
              { icon: ThumbsUp, label: "Status:" },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <item.icon className="w-5 h-5 mr-2 text-gray-400" />
                <span className="font-semibold">{item.label}</span>
                <Skeleton className="h-4 w-24 ml-2" />
              </div>
            ))}
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
      </DialogContent>
  )
}

export default LoadingMovieModal