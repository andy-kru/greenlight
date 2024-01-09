import React from 'react';
import Head from 'next/head';
import Ipc from '../../lib/ipc'
import Link from 'next/link';

import Card from '../../components/ui/card'
import { useXcloud } from '../../context/userContext'
import Loader from '../../components/ui/loader'
import ViewportGrid from '../../components/ui/viewportgrid';
import GameTitle from '../../components/ui/game/title';
import GameTitleDynamic from '../../components/ui/game/titledynamic';
import BreadcrumbBar from '../../components/ui/breadcrumbbar';


function xCloudLibrary() {
  const { xcloudTitles, setXcloudTitles} = useXcloud()
  const [filter, setFilter] = React.useState({
    name: ''
  });

  const resultsPerPage = 40

  React.useEffect(() => {
    if(xcloudTitles.length == 0){
      Ipc.send('xCloud', 'getTitles').then((titles) => {
        setXcloudTitles(titles)
      })
    }
  })

  function performFilter(titles){
    if(filter.name != ''){
      titles = titles.filter((item) => {
        return item.toLowerCase().includes(filter.name.toLowerCase())
      })
    }

    return titles
  }

  return (
    <React.Fragment>
      <Head>
        <title>Greenlight - xCloud Library</title>
      </Head>

      <BreadcrumbBar>
        <Link href="/xcloud/home">xCloud</Link>
        <Link href="/xcloud/library">Library</Link>
      </BreadcrumbBar>

      <h2 className="title">
        Library

        <input type="text" className="h2-search" placeholder="Search" onChange={
          (e) => {
            setFilter({
              name: e.target.value
            })
          }
        }></input>
      </h2>
      
      <ViewportGrid drawPagination={true}>{
        (xcloudTitles.length == 0) ? (<p><Loader></Loader></p>) : performFilter(xcloudTitles).map((item, i) => {
          return (
            <GameTitleDynamic
              titleId={ item }
              key={ item }
            ></GameTitleDynamic>
          )
        })
      }</ViewportGrid>

    </React.Fragment>
  );
};

export default xCloudLibrary;
