
export default async function getUserPosts(userId: string) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { next: {revalidate: 60}}
        // next: {revalidate: seconds} can be applied to SSG and SSR. The seconds is the amount of time before next checks the fetch to see if the cached data is stale. 
        // SSG, static site generation  
        // SSR, server side rendering 
        // ISR, incremental static regeneration 
        
        // default cache option: 
        // { cache: 'force-cache' }
        // never cache: 
        // { cache: 'no store'}
    )

    if (!response.ok) return undefined //throw new Error('failed to fetch user')

    return response.json()
}