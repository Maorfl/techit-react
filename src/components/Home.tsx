import { FunctionComponent } from "react";
import Header from "./Header";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    return (
        <>
            <Header />
            <h1>HOME</h1>
        </>
    );
}

export default Home;