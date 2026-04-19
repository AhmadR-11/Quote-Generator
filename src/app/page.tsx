'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Quote, RefreshCw } from "lucide-react"
import { Quote as QuoteType, getQuotesByTopic, getRandomQuotes } from "@/data/quotes"

const formSchema = z.object({
  topic: z.string().min(1, { message: "Topic is required." }),
})

export default function QuoteGenerator() {
  const [quotes, setQuotes] = useState<QuoteType[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "" },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
      setQuotes(getQuotesByTopic(values.topic, 3))
      setIsLoading(false)
    }, 1000)
  }

  const generateNewQuotes = () => {
    setIsLoading(true)
    setTimeout(() => {
      setQuotes(getRandomQuotes(3))
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 flex items-center justify-center gap-2 text-zinc-100">
            <Quote className="h-9 w-8 text-indigo-500" /> Quote Generator
          </h1>
          <p className="text-yellow-100">Get inspired with motivational quotes based on your topic</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Quotes</CardTitle>
            <CardDescription>
              Enter a topic to get related motivational quotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., motivation, success, life" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter any topic for related quotes, or leave blank for random.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 cursor-pointer"
                  >
                    {isLoading ? "Generating..." : "Generate Quotes"}
                  </Button>
                  {quotes.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateNewQuotes}
                      disabled={isLoading}
                      className="cursor-pointer"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {quotes.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {quotes.map((q) => (
              <Card key={q.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Quote className="h-6 w-6 text-indigo-500 mt-1" />
                    <div>
                      <blockquote className="text-lg font-medium mb-3 leading-relaxed">
                        &ldquo;{q.text}&ldquo;
                      </blockquote>
                      <div className="flex items-center justify-between">
                        <cite className="text-sm font-medium">— {q.author}</cite>
                        <span className="text-xs bg-indigo-200 text-indigo-900 px-2 py-1 rounded-full">
                          {q.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          !isLoading && (
            <Card className="text-center py-12">
              <CardContent>
                <Quote className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                <p>Enter a topic above to generate inspiring quotes!</p>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </div>
  )
}
