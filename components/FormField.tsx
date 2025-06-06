import React from 'react'
import {
  Form,FormControl,FormDescription,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import { Control, Controller, Field, FieldValues, Path } from 'react-hook-form'


interface FormFieldProps<T extends FieldValues>{
    name : Path<T>,
    control : Control<T>,
    label : string,
    placeholder ?: string,
    type ?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
} : FormFieldProps<T>) => {
  return (
    <Controller
        control={control}
        name={name}
        render={({ field }) => (
            <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
                This is your public display name.
            </FormDescription>
            <FormMessage />
            </FormItem>
        )}
    />
  )
}

export default FormField