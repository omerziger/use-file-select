export type FormatsRule = {
    key: 'format'
    formats: string[]
}

export type DurationRule =
    { key: 'duration', min?: number, max?: number }

export type SizeRule =
    { key: 'size', min?: number, max?: number }

export type Rule = FormatsRule | DurationRule | SizeRule