import { StyledLinearProgress } from "@/layouts/Theme";
import { ColorPrimary, ColorSecondary } from "@/styles/ThemeColorClient";
import { LinearProgress, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

const StyledProgressBar = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1,

}));



const TopProgressBar = ({ children }: { children: ReactNode }) => {

    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    const checkPathAdmin = location.pathname.includes("/admin");

    useEffect(() => {
        setPrevLocation(location.pathname);
        checkPathAdmin === true ? setIsLoading(false) : setIsLoading(true);
        if (location.pathname === prevLocation) {
            setPrevLocation("");
        }
    }, [location])

    useEffect(() => {
        setIsLoading(false);
    }, [prevLocation])

    return (
        <>
            <StyledProgressBar>
                {isLoading && <StyledLinearProgress />}
            </StyledProgressBar>
            {children}

        </>

    );
};

export default TopProgressBar;