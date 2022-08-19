import { Rule, UFSError, UFSFile } from "../types"

export function enforceRules(rules: Rule[], file: UFSFile): UFSError[] {
    const errors: UFSError[] = []

    rules.forEach(rule => {
        if (rule.key === 'size') {
            const fileSize = file.file.size
            if (rule.min && rule.min > fileSize) errors.push('size')
            if (rule.max && rule.max < fileSize && !errors.includes('size')) errors.push('size')
        }

        if (rule.key === 'format') {
            const fileFormat = file.file.type.split('/')[1]
            if (!rule.formats.includes(fileFormat)) errors.push('format')
        }

        if (rule.key === 'duration' && file.audioBuffer) {
            const fileDuration = file.audioBuffer.duration
            if (rule.min && rule.min > fileDuration) errors.push('duration')
            if (rule.max && rule.max < fileDuration && !errors.includes('duration')) errors.push('duration')
        }
    })

    return errors
}