import React, { Children } from 'react';
import Header from './header';
import Footer from './footer';
export default function BaseLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}