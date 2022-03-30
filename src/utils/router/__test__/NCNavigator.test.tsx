/**
 * @jest-environment jsdom
 */

import {NCNavigator} from "../NCNavigator";
import {NavigateFunction} from "react-router";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import React from "react";
import {act, render} from "@testing-library/react";

const MockComponent = (): React.ReactElement => {
        const navigate: NavigateFunction = useNavigate();
        new NCNavigator("/", navigate);
        return <Routes>
            <Route
                path={"/"}
                element={
                    <div>
                        Home Page
                    </div>
                }
            />
            <Route path={"/counter"} element={<div>Counter Page</div>} />
            <Route path={"/watch"} element={<div>Watch Page</div>} />
        </Routes>
};

describe("NCNavigator Tests", () => {
    it("Render First", () => {
        try {
            NCNavigator.currentPath()
        } catch (err) {
            expect(err).toEqual(new Error("Please register navigate first. : https://github.com/ncodeofficial/ncode_react_lib/blob/main/NAVIGATE.md"));
        }
    });


    it("CurrentLocation Test since NCNavigator register.", () => {
        render( <BrowserRouter><MockComponent /></BrowserRouter>);

        act(() => {
            expect(NCNavigator.currentPath()).toEqual('/');
        })
    });

    it("Move Test Path since NCNavigator register.", () => {
        render( <BrowserRouter><MockComponent /></BrowserRouter>);

        act(() => {
            expect(NCNavigator.currentPath()).toEqual('/');
            NCNavigator.moveTo('/watch')
            expect(NCNavigator.currentPath()).toEqual('/watch');
        })
    });

    it("OriginGoTo Test since NCNavigator register.", () => {
        render( <BrowserRouter><MockComponent /></BrowserRouter>);

        act(() => {
            NCNavigator.moveTo('/watch')
            NCNavigator.moveTo('/counter')
            NCNavigator.originGoTo()
            expect(NCNavigator.currentPath()).toEqual('/');
        })
    });

    it("TargetGoTo Test since NCNavigator register.", () => {
        render( <BrowserRouter><MockComponent /></BrowserRouter>);

        act(() => {
            expect(NCNavigator.currentPath()).toEqual('/');
            NCNavigator.targetGoTo('/watch', '/counter')
            expect(NCNavigator.currentPath()).toEqual('/counter');
            NCNavigator.originGoTo()
            expect(NCNavigator.currentPath()).toEqual('/watch');
        })
    });

    test("Go Back Path Test since NCNavigator register.",   async () => {
        render( <BrowserRouter><MockComponent /></BrowserRouter>);

        await act(async () => {
            NCNavigator.moveTo('/watch')
            expect(NCNavigator.currentPath()).toEqual('/watch');
            NCNavigator.moveTo('/counter');
            expect(NCNavigator.currentPath()).toEqual('/counter');
            NCNavigator.goBack();
            await setTimeout(() =>expect(NCNavigator.currentPath()).toEqual('/watch'),500);
        })
    });

    it("Replace Path Test since NCNavigator register.", async () => {
        render( <BrowserRouter><MockComponent /></BrowserRouter>);

        await act(async () => {
            NCNavigator.replace('/watch')
            await setTimeout(() =>expect(NCNavigator.currentPath()).toEqual('/watch'),500);
        })
    });
});