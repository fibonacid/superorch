import React, { useEffect, useContext } from "react";
import styled from 'styled-components/macro';
import { Switch, Route, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import routes from '../../config/routes';

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
`;

const StyledMain = styled.div`
flex: 1;
display: flex;
`;

const StyledSidebar = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
  padding: 0 10px;
`;

export default function Routes() {
const { token } = useContext(AuthContext);
const location = useLocation();

// This piece of state is set when one of the
// menu links is clicked. The `background` state
// is the location that we were at when one of
// the menu links was clicked. If it's there,
// use it as the location for the <Switch> so
// we show the overlay in the background, behind
// the modal.
let background = location.state && location.state.background;

useEffect(() => {
  console.log("pageview", location.pathname);
}, [location]);

return (
  <StyledWrapper>
    <StyledSidebar>
      <Switch>
        {routes.map((route, index) => (
          // You can render a <Route> in as many places
          // as you want in your app. It will render along
          // with any other <Route>s that also match the URL.
          // So, a sidebar or breadcrumbs or anything else
          // that requires you to render multiple things
          // in multiple places at the same URL is nothing
          // more than multiple <Routes>.
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            children={<route.sidebar token={token}/>}
          />
        ))}
      </Switch>
    </StyledSidebar>
    <StyledMain>
      <Switch location={background || location}>
        {routes.map((route, index) => {
          // console.log(route.path, location.pathname);
          // Render more <Routes> with the same paths as
          // above, but different components this time.
          return (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.main token={token}/>}
            />
          )
        })}
      </Switch>
      {background && (
        <Switch>
          {routes.map((route, index) => (
              <Route 
                key={index}
                path={route.path}
                children={route.modal}
              />
          ))}
        </Switch>
      )}
    </StyledMain>
  </StyledWrapper>
)
}


// export default function Routes() {
//   const { token } = useContext(AuthContext);
//   const location = useLocation();

//   // This piece of state is set when one of the
//   // menu links is clicked. The `background` state
//   // is the location that we were at when one of
//   // the menu links was clicked. If it's there,
//   // use it as the location for the <Switch> so
//   // we show the overlay in the background, behind
//   // the modal.
//   let background = location.state && location.state.background;

//   useEffect(() => {
//     console.log("pageview", location.pathname);
//   }, [location]);

//   return (
//     <>
//       <Switch location={background || location}>
//         <Route
//           exact
//           path="/login"
//           children={!token ? <LoginView /> : <Redirect to="/" />}
//         />
//         <Route
//           exact
//           path="/register"
//           children={!token ? <RegisterView /> : <Redirect to="/" />}
//         />
//         {!token && <Redirect to="/login" />}

//         {/* ----- Only logged in pages ----- */}
//         <Route exact path="/account" children={<AccountView />} />

//         <Route
//           exact
//           path="/orchestras/create"
//           children={<CreateOrchestraView />}
//         />
//         <Route
//           exact
//           path="/orchestras/:id/edit"
//           children={<EditOrchestraView />}
//         />
//         <Route
//           exact
//           path="/orchestras/:id/invites"
//           children={<InvitesOrchestraView />}
//         />
//         <Route exact path="/orchestras/:id" children={<OrchestraView />} />
//         <Route exact path="/" children={<HomeView />} />
//       </Switch>

//       {/* Show the following views as overlays when a background page is set */}
//       {background && (
//         <Route
//           path="/orchestras/:id/delete"
//           children={<DeleteOrchestraView />}
//         />
//       )}
//     </>
//   );
// }
