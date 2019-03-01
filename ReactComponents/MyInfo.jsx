function MyInfo() {
    let cssClassName = 'otherCSS';
    return (
        <React.Fragment>
            <h1> Valeri Sabev </h1>
            <p className="someCSS"> Hello, my name is Valeri as stated above, I am 16y old and I will soon turn 17. Its insane how fast you grow honesly </p>
            <ol className={cssClassName}>
                <li> Dubai </li>
                <li> Linz </li>
                <li> St. Moritz </li>
            </ol>
        </React.Fragment>
    );
}

// Fatser Way would be (it still returns in etc)
const MyOtherInfo = () => <React.Fragment> <h1> Some HTML </h1> </React.Fragment>;