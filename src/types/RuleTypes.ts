export type formatsRule = {
    key: 'format'
    formats: string[]
}

export type durationRule = 
{ key: 'duration', min?: number, max?: number }

export type sizeRule = 
{ key: 'size', min?: number, max?: number }

export type Rule = formatsRule | durationRule | sizeRule