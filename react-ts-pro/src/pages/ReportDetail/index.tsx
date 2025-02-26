import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

// 定义 Note 类型
type Note = {
    id: number;
    content: string;
    isIgnored: boolean;
    order: number;
    title: string;
};

// 更新 order 的函数
const updateOrder = (notes: Note[]) => {
    let cur_order = 1;
    return notes.map(note => {
        if (!note.isIgnored) {
            note.order = cur_order;
            cur_order++;
        }
        return note;
    });
};

const ReportDetail: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isDrawerPinned, setIsDrawerPinned] = useState(true);
    const [notes, setNotes] = useState<Note[]>(() => {
        const initialNotes: Note[] = [
            { id: 234231, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 2342342, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 35543245, content: "IKEA and Nike", isIgnored: true, order: 0, title: "IKEA and Nike" },
            { id: 234231, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 2342342, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 35543245, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 234231, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 2342342, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" },
            { id: 35543245, content: "IKEA and Nike", isIgnored: false, order: 0, title: "IKEA and Nike" }
            // 更多数据可继续补充
        ];
        return updateOrder(initialNotes);
    });

    const handleDrawerToggle = () => {
        if (!isDrawerPinned) {
            setIsDrawerOpen(!isDrawerOpen);
        }
    };

    const handlePinToggle = () => {
        setIsDrawerPinned(!isDrawerPinned);
    };

    const handleDragEnd = (result: any) => {
        if (!result.destination) return;
        const items = Array.from(notes);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        const updatedNotes = updateOrder(items);
        setNotes(updatedNotes);
    };

    const handleCheckboxChange = (index: number) => {
        setNotes(prevNotes => {
            const newNotes = [...prevNotes];
            newNotes[index].isIgnored = !newNotes[index].isIgnored;
            const updatedNotes = updateOrder(newNotes);
            return updatedNotes;
        });
    };

    return (
        <div className="flex h-screen">
            {/* Slide */}
            <Slide
                direction="left"
                in={isDrawerOpen || isDrawerPinned}
                mountOnEnter
                unmountOnExit
            >
                <div
                    onMouseEnter={handleDrawerToggle}
                    onMouseLeave={handleDrawerToggle}
                    className={`${isDrawerPinned ? 'w-64' : 'w-0 transition-all duration-300'} bg-gray-100 p-4 flex flex-col h-full`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <div className="text-xl font-bold">Archies Test Project</div>
                        <IconButton onClick={handlePinToggle}>
                            {/* 图钉图标可根据实际引入 */}
                        </IconButton>
                    </div>
                    <div className="text-gray-600 mb-4">
                        <p>1. Select, view, edit and order your Notes.</p>
                        <p>2. Choose a report style and images.</p>
                        <p>3. Generate your Report</p>
                    </div>

                    {/* 让 TableContainer 占满剩余空间 */}
                    <TableContainer component={Paper} className="border border-[#DC2F20] overflow-auto flex-grow">
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Paragraph NO.</TableCell>
                                    <TableCell>Hide</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="notes">
                                    {(provided) => (
                                        <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                                            {notes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={`note-${note.id}`} index={index}>
                                                    {(provided) => (
                                                        <TableRow
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            // 根据 isIgnored 动态添加类名
                                                            className={`hover:bg-gray-200 ${note.isIgnored ? 'text-gray-400' : ''}`}
                                                        >
                                                            <TableCell>{note.isIgnored ? '' : note.order}</TableCell>
                                                            <TableCell>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={note.isIgnored}
                                                                    onChange={() => handleCheckboxChange(index)}
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{
                                                                color: note.isIgnored ? 'grey' : 'initial'
                                                            }}>{note.title}</TableCell>
                                                        </TableRow>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Table>
                    </TableContainer>
                </div>
            </Slide>

            {/* Main Content */}
            <main className={`flex-1 p-4 ${isDrawerOpen || isDrawerPinned ? 'pl-16' : 'pl-0'}`}>
                <div className="mb-4">
                    <h2 className="text-xl font-bold mb-2">Archies Test Project</h2>
                    <div className="text-gray-600">
                        <p>1. Select, view, edit and order your Notes.</p>
                        <p>2. Choose a report style and images.</p>
                        <p>3. Generate your Report</p>
                    </div>
                </div>
                <div className="flex">
                    {/* Left Box */}
                    <div className="w-1/2 mr-4">
                        <div className="bg-white p-4 border border-gray-300">
                            <p className="text-gray-800 mb-4">Note: Ikea vs Nike Carbon Offset</p>
                            <p className="text-gray-600">
                                IKEA and Nike have both committed to reducing their carbon footprints, but their approaches and progress differ...
                            </p>
                            <div className="flex justify-end mt-4">
                                <Button variant="outlined" className="mr-2">
                                    Edit Note
                                </Button>
                                <Button variant="contained" color="primary">
                                    Save Note
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Right Box */}
                    <div className="w-1/2">
                        {/* 第一部分 */}
                        <div className="h-1/2 bg-white p-4 border border-gray-300 mb-4">
                            {/* 预览图部分 */}
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="w-1/3 h-16 bg-blue-500 m-2 inline-block relative">
                                    <input type="checkbox" className="absolute bottom-0 right-0" />
                                </div>
                            ))}
                        </div>
                        {/* 第二部分 */}
                        <div className="h-1/5 bg-white p-4 border border-gray-300 mb-4">
                            {/* 内容参考图片 */}
                        </div>
                        {/* 第三部分 */}
                        <div className="h-1/5 bg-white p-4 border border-gray-300 mb-4">
                            <input type="text" placeholder="输入内容" className="w-full p-2 border border-gray-300" />
                        </div>
                        {/* 第四部分 */}
                        <div className="h-1/10 bg-white p-4 border border-gray-300">
                            <Button variant="contained" color="primary">
                                {/* 按钮文字参考图片 */}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ReportDetail;