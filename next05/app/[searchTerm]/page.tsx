import getWikiResults from "@/lib/getWikiResults"
import Item from "./components/Item"

export async function generateMetadata({params}: Props) {
    const {searchTerm} = await params
    const displayTerm = decodeURIComponent(searchTerm);
    const wikiData: Promise<SearchResult> = getWikiResults(displayTerm)
    const data = await wikiData 


    if (!data?.query?.pages) {
        return {
            title: `${displayTerm} not found.`
        }
    }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`
    }
}

type Props = {
    params: {
        searchTerm: string
    }
}

export default async function SearchResults({params}: Props) {
    const {searchTerm} = await params
    const displayTerm = decodeURIComponent(searchTerm);
    const wikiData: Promise<SearchResult> = getWikiResults(displayTerm)
    const data = await wikiData 


    const results: Result[] | undefined = data?.query?.pages

    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {results
                ? Object.values(results).map(result => {
                    return <Item key={result.pageid} result={result} />
                })
                : <h2 className="p-2 text-xl">{`${displayTerm} not found.`}</h2> 
            }
        </main>
    )

  return content
}
