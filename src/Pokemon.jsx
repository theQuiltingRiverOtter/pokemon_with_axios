function Pokemon({ img_src, name }) {
    return (
        <div className="pokemon">
            <img src={img_src}></img>
            <p>{name[0].toUpperCase() + name.slice(1)}</p>
        </div>
    )
}

export default Pokemon