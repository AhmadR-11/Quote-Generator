import { setIsLoading } from './setIsLoading';

function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setTimeout(() => {
        setQuotes(getQuotesByTopic(values.topic, 3))
        setIsLoading(false)
    }, 2000)
}