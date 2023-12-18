
export const Authorisation = () => {

    return(
        <div className="">
            <form action="/api/login/" method="post">
                <label htmlFor="username"></label>
                <input type="text" name="username" id="username" className=""/>
                <label htmlFor="password"></label>
                <input type="text" name="password" id="password" className=""/>
                <button type="submit">Войти</button>
            </form>
        </div>
    )

}