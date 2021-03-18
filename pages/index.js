import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default function Index({ shows }) {
    return (
        <>
            <div>Hello there!</div>
            <Link href="/about"><a>About</a></Link>
            <h1>Series</h1>
            <ul>
                {shows && shows.map(show => 
                    <li key={show.id}>
                        <Link href="/show/[id]" as={`/show/${show.id}`}>
                            <a>{show.name}</a>
                        </Link>
                    </li>)}
            </ul>
        </>
    )
}

Index.getInitialProps = async function () {
    const res = await fetch('https://api.tvmaze.com/search/shows?q=sherlock')
    const data = await res.json()
    const shows = {shows: data.map(entry => entry.show) }
    console.log('Rendering ...', shows)
    return shows
}