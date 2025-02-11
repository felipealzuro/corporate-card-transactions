import React from 'react'

export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => {
  return <select {...props} className={`px-2 py-1 border rounded ${props.className || ''}`} />
}

export const SelectContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <>{children}</>
}

export const SelectItem: React.FC<React.OptionHTMLAttributes<HTMLOptionElement>> = (props) => {
  return <option {...props} />
}

export const SelectTrigger: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {
  return <div>{children}</div>
}

export const SelectValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => {
  return <span {...props} />
}