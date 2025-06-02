import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const MainBanner = () => {
    return (
        <div className="relative">
            {/* ------------- Banner Images ------------- */}
            {/* Desktop Banner Image */}
            <img src={assets.main_banner_bg} alt="banner" className="hidden w-full md:block" />

            {/* Mobile Banner Image */}
            <img src={assets.main_banner_bg_sm} alt="banner" className="block w-full md:hidden" />

            {/* ------------- Overlay Content ------------- */}
            <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-24 md:pb-0 md:items-start md:justify-center md:pl-18 lg:pl-24">

                {/* Banner Heading */}
                <h1 className="max-w-[18rem] text-center text-3xl font-bold leading-tight md:max-w-[20rem] md:text-left md:text-4xl lg:max-w-[26rem] lg:text-5xl lg:leading-[3.5rem]">
                    Freshness You Can Trust, Savings You Will Love!
                </h1>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-4 font-medium">
                    <Link
                        to="/product"
                        className="group flex items-center gap-2 rounded bg-primary px-7 py-3 text-white transition hover:bg-primary-dull"
                    >
                        Shop Now
                        <img
                            src={assets.white_arrow_icon}
                            alt="arrow"
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>

                    <Link
                        to="/product"
                        className="group hidden items-center gap-2 px-9 py-3 md:flex"
                    >
                        Explore Deals
                        <img
                            src={assets.black_arrow_icon}
                            alt="arrow"
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;
