export type formatsRule = {
    key: 'formats'
    formats: string[]
}

export type durationRule = { key: 'duration', min: number } |
{ key: 'duration', max: number } |
{ key: 'duration', min: number, max: number }

export type sizeRule = { key: 'size', min: number } |
{ key: 'size', max: number } |
{ key: 'size', min: number, max: number }