'use client'
import { useState, useEffect } from "react";
import { useListPageStore } from "@/store/core";

interface Props {
    itemTotalCount: number;
    pageLimit: number;
}

export default function Pagination({ itemTotalCount, pageLimit }: Props) {
    const { currentPage, setCurrentPage } = useListPageStore();
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const [hasPager, setHasPager] = useState(false);

    const render = (remain: number) => {
        if ((currentPage % 5 === remain) && itemTotalCount > 0) {
            const lastPage = getLastPageIndex();
            const numbers = [];
            for (let i = currentPage; i < currentPage + 5; i++) {
                if (i >= lastPage) {
                    break;
                }

                numbers.push(i);
            }

            setPageNumbers(numbers);
        }
    };

    const getLastPageIndex = () => {
        return Math.ceil(itemTotalCount / pageLimit);
    };

    const toPrevious = () => {
        if (currentPage <= 1) {
            return;
        }

        setCurrentPage(currentPage - 1);
    };

    const toNext = () => {
        const lastPage = getLastPageIndex();
        if (currentPage >= lastPage) {
            return;
        }

        setCurrentPage(currentPage + 1);
    };

    useEffect(() => {
        render(1);
        setTimeout(() => {
            setHasPager(true);
        }, 250);
    }, [currentPage, itemTotalCount]);

    return (
        hasPager ? (
            <footer className="absolute bottom-0 right-0 w-full flex items-center justify-between" style={{ padding: 18 }}>
                <div className="w-full flex justify-center">
                    <ul className="flex items-center text-black">
                        <li className="p-2 cursor-pointer" onClick={() => setCurrentPage(1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"/>
                            </svg>
                        </li>
                        <li className="p-2 cursor-pointer" onClick={() => toPrevious()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                            </svg>
                        </li>
                        {pageNumbers.map((n) => (
                            <li
                                key={`pagination-${n}`}
                                className={`p-2 cursor-pointer ${n == currentPage ? 'font-bold' : 'font-light'}`}
                                onClick={() => setCurrentPage(n)}>
                                {n}
                            </li>
                        ))}
                        <li className="p-2 cursor-pointer" onClick={() => toNext()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                        </li>
                        <li className="p-2 cursor-pointer" onClick={() => {
                            const lastPage = getLastPageIndex();
                            let remain = lastPage % 5;
                            const numbers = [];
                            if (remain === 0) remain = 5;
                            for (let i = lastPage; i > lastPage - remain; i--) {
                                numbers.push(i);
                            }

                            numbers.sort();
                            setPageNumbers(numbers);
                            setCurrentPage(lastPage);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                 stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"/>
                            </svg>
                        </li>
                    </ul>
                </div>
            </footer>
        ) : null
    );
}
