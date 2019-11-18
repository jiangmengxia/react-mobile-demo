/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-09-28 10:32:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-28 13:04:50
 */
import React, { Suspense } from 'react'
import { HashRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import flowerLoading from 'components/loading/flowerLoading'
function createRourer(routes) {
    console.log(routes)
    let r = <HashRouter>
        <Suspense fallback={flowerLoading}>
            <Switch>
                <Route path='/AAA' render={() => <h1>AAA</h1>}></Route>
                <Route path='/BBB' render={() => <h1>BBB</h1>}></Route>

                {routes.map(({ path, component, render }) => {
                    return < Route
                        path={path}
                        key={path}
                        component={withRouter(component)}
                        render={render}
                    >
                    </Route>
                })}
                <Redirect to='/' />
            </Switch>
        </Suspense>
    </HashRouter >
    return r
}

export default createRourer