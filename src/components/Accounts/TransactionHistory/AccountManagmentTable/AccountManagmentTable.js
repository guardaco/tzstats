import React from 'react';
import { Spiner } from '../../../../components/Common';
import { Blockies, NoDataFound, Value } from '../../../Common';
import { TableBody, TableHeader, TableHeaderCell, TableRow, TableCell, TableDetails } from '../../../Common';
import { getShortHashOrBakerName } from '../../../../utils';
import { getTableDataByType } from '../../../../services/api/tz-stats';
import { Link } from 'react-router-dom';

const AccountManagmentTable = ({ account }) => {
  const [data, setData] = React.useState({table:[], isLoaded: false });

  React.useEffect(() => {
    const fetchData = async () => {
      let acc = await getTableDataByType({
        address: account.address,
        type: 'managed',
        limit: account.n_origination
      });
      setData({table: acc, isLoaded: true});
    };
    if (account.n_origination) {
      fetchData();
    } else {
      setData({isLoaded: true});
    }
  }, [account]);

  return (
    <>
      <TableHeader>
        <TableHeaderCell width={5}>No</TableHeaderCell>
        <TableHeaderCell width={15}>Account</TableHeaderCell>
        <TableHeaderCell width={20}>Created</TableHeaderCell>
        <TableHeaderCell width={20}>Last Seen</TableHeaderCell>
        <TableHeaderCell width={15}>Balance</TableHeaderCell>
        <TableHeaderCell width={15}>Delegate</TableHeaderCell>
      </TableHeader>
      {data.isLoaded ? (
        <TableBody id={'account-managed'}>
          {data.table && data.table.length ? (
            data.table.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell width={5}><TableDetails>{i+1}</TableDetails></TableCell>
                  <TableCell width={15}>
                    <Blockies hash={item.account} />
                    <Link to={`/account/${item.account}`}>{getShortHashOrBakerName(item.account)}</Link>
                  </TableCell>
                  <TableCell width={20}><Value value={item.first_in_time} type="datetime"/></TableCell>
                  <TableCell width={20}><Value value={item.last_seen_time} type="datetime"/></TableCell>
                  <TableCell width={15}><Value value={item.spendable_balance} type="currency" digits={0} zero="-"/></TableCell>
                  {item.delegate?(
                    <TableCell width={15}>
                      <Blockies hash={item.delegate} />
                      <Link to={`/account/${item.delegate}`}>{getShortHashOrBakerName(item.delegate)}</Link>
                    </TableCell>
                  ) : (
                    <TableCell width={15}>-</TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            <NoDataFound />
          )}
        </TableBody>
      ) : (
        <TableBody>
          <Spiner />
        </TableBody>
      )}
    </>
  );
};

export default AccountManagmentTable;
