import BotPage from "../pages/BotPage";
import ConfigurePage from "../pages/ConfigurePage";
import EditBot from "../pages/EditBot";
import FilterPage from "../pages/FilterPage";
import Game from "../pages/Game";
import Home from "../pages/Home";
import Locale from "../pages/Locale";
import LogOut from "../pages/LogOut";
import NotFound from "../pages/NotFound";
import AdminPage from "../pages/AdminPage";

const routes = [
  {
    path: '/:locale/',
    exact: true,
    component: Home,
    status: 200,
  }, {
    path: '/:locale/game',
    exact: true,
    component: Game,
    status: 200,
  }, {
    path: '/:locale/auth/logout',
    exact: true,
    component: LogOut,
    status: 200,
  }, {
    path: '/:locale/bots/add',
    exact: true,
    component: EditBot,
    status: 200,
  }, {
    path: '/:locale/bots/filter',
    exact: true,
    component: FilterPage,
    status: 200,
  }, {
    path: '/:locale/bots/:id/configure',
    exact: true,
    component: ConfigurePage,
    status: 200,
  }, {
    path: '/:locale/bots/:id/edit',
    exact: true,
    component: EditBot,
    status: 200,
  }, {
    path: '/:locale/bots/:id',
    exact: true,
    component: BotPage,
    status: 200,
  }, {
    path: '/:locale/locale',
    exact: true,
    component: Locale,
    status: 200,
  }, {
    path: '/:locale/admin',
    exact: true,
    component: AdminPage,
    status: 200,
  }, {
    path: '/:locale',
    exact: false,
    component: NotFound,
    status: 404,
  }
];

export default routes;
