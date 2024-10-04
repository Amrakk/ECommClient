import sad from "../../assets/error/sad.png";

export default function NotFound() {
    return (
        <>
            <div class="erroe_page_wrapper">
                <div class="errow_wrap">
                    <div class="container text-center">
                        <img src={sad} />
                        <div class="error_heading text-center">
                            <h3 class="headline color_parpel2">500</h3>
                        </div>
                        <div class="flex-[0_0_auto] w-2/3 ml-[calc(100%/6)] text-center">
                            <p>Internal Server Error</p>
                        </div>
                        <div class="error_btn text-center">
                            <a class="default_btn parpel_bg2" href="/home">
                                Back Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
