import "@/styles/multiRangeSlider.css";
import { useCallback, useEffect, useState, useRef } from "react";

type Props = {
    min: number;
    max: number;
    defaultMin?: number;
    defaultMax?: number;
    isPrice?: boolean;
    onChange?: (min: number, max: number) => void;
};

export default function MultiRangeSlider(props: Props) {
    const [minVal, setMinVal] = useState(props.defaultMin ?? props.min);
    const [maxVal, setMaxVal] = useState(props.defaultMax ?? props.max);

    const minValRef = useRef(props.defaultMin ?? props.min);
    const maxValRef = useRef(props.defaultMax ?? props.max);
    const range = useRef<HTMLDivElement>(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value: number) => Math.round(((value - props.min) / (props.max - props.min)) * 100),
        [props.min, props.max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    useEffect(() => {
        if (props.onChange) {
            props.onChange(minVal, maxVal);
        }
    }, [minVal, maxVal]);

    return (
        <div className="container overflow-hidden">
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal - 1);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb thumb--left"
                style={{ zIndex: minVal > props.max - 100 ? "5" : undefined }}
            />
            <input
                type="range"
                min={props.min}
                max={props.max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal + 1);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb thumb--right"
            />

            <div className="slider">
                <div className="slider__track" />
                <div ref={range} className="slider__range" />
                <div className="slider__left-value">
                    {props.isPrice ? minVal.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : minVal}
                </div>
                <div className="slider__right-value">
                    {props.isPrice ? maxVal.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : maxVal}
                </div>
            </div>
        </div>
    );
}
