import React, { useEffect, useState } from 'react';

import { SearchItem } from '~/components/search/search-item';
import { Spinner } from '~/components/spinner/spinner';

import { UserService } from '~/services/user.service';

import styles from './index.module.scss';

export const CrewMembers = () => {
  const [crews, setCrews] = useState([]);

  useEffect(() => {
    UserService.getCrewMembers().then((data) => {
      setCrews(data);
    });
  }, []);

  const crewKeys = Object.keys(crews);

  return (
    crewKeys.length > 0 ? (
      <div className={styles.app}>
        {crewKeys.map((crew) => {
          return (
            <React.Fragment key={crew}>
              <h2 className={styles.crewTitle}>
                <img src={`/images/logo/${crew.toLowerCase()}/logo192.png`}
                     alt={crew} />
                {crew}
              </h2>
              <ul className={styles.crewBox}>
                {
                  crews[crew].map(user => {
                    return (
                      <SearchItem
                        key={user.userID}
                        user={user}
                        onAddSearchHistory={null}
                        onRemoveSearchItem={null}
                      />
                    );
                  })
                }
              </ul>
            </React.Fragment>
          );
        })}
      </div>
    ) : <Spinner />
  );
};