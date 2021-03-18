import Link from 'next/Link'

function Show({ show }) {
    return (
        <>
            <Link href="/"><a>Home</a></Link>
            <Link href="/about"><a>About</a></Link>
            <h1>{show.name}</h1>
            <p>{show.summary}</p>
            {show.image && <img src={show.image.medium} />}
        </>
    )
}

Show.getInitialProps = async function (context) {
    const { id } = context.query
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()
    return { show }
}

export default Show