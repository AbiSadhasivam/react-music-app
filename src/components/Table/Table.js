import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import { Button } from 'reactstrap';
import './Table.css';

const Table = ({
  columns,
  data,
  bodyClass = '',
  isSelectionRqd = true,
  selectHandler,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      style: {
        height: '400px', // This will force the table body to overflow and scroll, since there is not enough room
      },
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      if (isSelectionRqd) {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    }
  );
  const [selectedSongList, setSelectedSongList] = useState([]);

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <div>
          <input type='checkbox' ref={resolvedRef} {...rest} />
        </div>
      );
    }
  );

  useEffect(() => {
    if (selectedFlatRows.length === 0) {
      return;
    }
    if (selectedSongList.length > selectedFlatRows.length) {
      const results = selectedSongList.filter(
        (selectedSong) =>
          !selectedFlatRows.some((song) => song.original.id === selectedSong.id)
      );
      if (results.length > 0) {
        let index = selectedSongList.findIndex(
          (song) => song.id === results[0].id
        );
        selectedSongList.splice(index, 1);
      }
      setSelectedSongList(selectedSongList);
    } else {
      let addedSongList = selectedFlatRows.filter((selectedSong) => {
        return !selectedSongList.some(
          (song) => selectedSong.original.id === song.id
        );
      })
      if (addedSongList.length === 0) {
        return
      }
      let addedSong = addedSongList[0].original;
      addedSong[
        'addedAt'
      ] = `${new Date().toDateString()}  ${new Date().toTimeString()}`;
      selectedSongList.push(addedSong);
      setSelectedSongList(selectedSongList);
    }
  }, [selectedFlatRows]);

  const addSongsHandler = () => {
    selectHandler(selectedSongList);
  };
  return (
    <div className='tbl-ctr'>
      <div {...getTableProps()} className='custom-tbl'>
        <div className='table-hdr'>
          {headerGroups.map((headerGroup) => (
            <div className='table-row' {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <div
                  className={
                    column.id === 'selection' || column.id === 'thumbnailUrl'
                      ? 'selector'
                      : 'cell header'
                  }
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className={bodyClass + ' table-bdy'}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className='table-row'>
                {row.cells.map((cell) => {
                  return (
                    <div
                      {...cell.getCellProps()}
                      className={
                        cell.column.id === 'selection' ||
                        cell.column.id === 'thumbnailUrl'
                          ? 'selector'
                          : 'cell'
                      }
                    >
                      {cell.render('Cell')}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className='pagination'>
        <span className='page-data'>
          Page &nbsp;
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <select
          className='page-select'
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {selectHandler && (
        <div className='actions'>
          <Button
            className='primary'
            disabled={selectedFlatRows.length === 0}
            onClick={addSongsHandler}
          >
            Add Songs
          </Button>
        </div>
      )}
    </div>
  );
};
export default Table;
