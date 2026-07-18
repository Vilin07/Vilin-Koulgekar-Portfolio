import { SITE } from "../../constants/site";

function Welcome() {

    return (

        <section className="relative flex h-screen items-center justify-center">

            <div className="text-center">

                <p className="text-4xl text-yellow-300">

                    ॐ

                </p>

                <h1
                    className="mt-10 text-7xl md:text-8xl text-white"
                    style={{ fontFamily: "Cormorant Garamond" }}
                >

                    {SITE.welcome}

                </h1>

                <p className="mt-10 text-gray-400 tracking-[6px] uppercase">

                    {SITE.enter}

                </p>

                <div className="mt-28">

                    <div className="animate-bounce text-2xl">

                        ↓

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Welcome;