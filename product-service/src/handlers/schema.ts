interface IRating {
  source: string
  value: number
}

enum MovieType {
  movie = 'movie',
  series = 'series',
}

export interface IFilm {
  title: string
  year: number
  adult?: boolean
  release?: string
  genre?: string
  director?: string
  writer?: string
  actors?: string[]
  language?: string
  country?: string
  poster?: string
  ratings?: IRating[]
  type?: MovieType
  production?: string
}
