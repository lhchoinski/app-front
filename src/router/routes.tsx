import React, { lazy } from 'react';
import Pessoas from '../pages/Pessoas';
import Recibos from '../pages/Recibos';
import RelatorioPeriodo from '../pages/Relatorios/Periodo';
import Usuarios from '../pages/Usuarios';
import PessoaCadastrar from '@/pages/Pessoas/CreateOrUpdate';
import UsuarioCadastrar from '@/pages/Usuarios/CreateOrUpdate';
import Fontes from '@/pages/Fontes';
import FonteCadastrar from '@/pages/Fontes/CreateOrUpdate';
import ImpostoCadastrar from '@/pages/Impostos/CreateOrUpdate';

const Home = lazy(() => import('../pages/Index'));
const Recibo = lazy(() => import('../pages/Recibos/CreateOrUpdate'));
const Impostos = lazy(() => import('../pages/Impostos'));
const RecibosView = lazy(() => import('../pages/Recibos/Visualizar'));

const ERROR404 = lazy(() => import('../pages/ErrorPages/Error404'));
const ERROR500 = lazy(() => import('../pages/ErrorPages/Error500'));
const ERROR503 = lazy(() => import('../pages/ErrorPages/Error503'));

const Login = lazy(() => import('../pages/Authentication/Login'));

const routes = [
    // Home
    {
        path: '/',
        element: <Home />,
        layout: 'default',
    },

    // Gerar recibos

    {
        path: '/recibos',
        element: <Recibos />,
        layout: 'default',
    },
    {
        path: '/recibos/cadastrar',
        element: <Recibo />,
        layout: 'default',
    },
    {
        path: '/recibos/editar/:id',
        element: <Recibo />,
        layout: 'default',
    },
    {
        path: '/recibos/visualizar/:id',
        element: <RecibosView />,
        layout: 'default',
    },

    // Gestão de pessoas
    {
        path: '/gestao-de-pessoas/pessoas',
        element: <Pessoas />,
        layout: 'default',
    },
    {
        path: '/pessoas/cadastrar',
        element: <PessoaCadastrar />,
        layout: 'default',
    },
    {
        path: '/pessoas/editar/:id',
        element: <PessoaCadastrar />,
        layout: 'default',
    },
    {
        path: '/pessoas/visualizar/:id',
        element: <PessoaCadastrar />,
        layout: 'default',
    },

    // Relatorios
    {
        path: '/relatorios/relatorio-mensal/periodo',
        element: <RelatorioPeriodo />,
        layout: 'default',
    },

    // Fontes
    {
        path: '/fontes',
        element: <Fontes />,
        layout: 'default',
    },
    {
        path: '/fontes/cadastrar',
        element: <FonteCadastrar />,
        layout: 'default',
    },
    {
        path: '/fontes/editar/:id',
        element: <FonteCadastrar />,
        layout: 'default',
    },
    {
        path: '/fontes/visualizar/:id',
        element: <FonteCadastrar />,
        layout: 'default',
    },

    //Impostos

    {
        path: '/impostos',
        element: <Impostos />,
        layout: 'default',
    },
    {
        path: '/impostos/cadastrar',
        element: <ImpostoCadastrar />,
        layout: 'default',
    },
    {
        path: '/impostos/editar/:id',
        element: <ImpostoCadastrar />,
        layout: 'default',
    },
    {
        path: '/impostos/visualizar/:id',
        element: <ImpostoCadastrar />,
        layout: 'default',
    },

    // Administrador
    {
        path: '/administrador/usuarios',
        element: <Usuarios />,
        layout: 'default',
    },
    {
        path: '/administrador/usuario/cadastrar',
        element: <UsuarioCadastrar />,
        layout: 'default',
    },
    {
        path: '/administrador/usuario/editar/:id',
        element: <UsuarioCadastrar />,
        layout: 'default',
    },
    {
        path: '/administrador/usuario/visualizar/:id',
        element: <UsuarioCadastrar />,
        layout: 'default',
    },

    //error pages
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <ERROR404 />,
        layout: 'blank',
    },

    //Authentication
    {
        path: '/auth/login',
        element: <Login />,
        layout: 'blank',
    },
];

export { routes };
