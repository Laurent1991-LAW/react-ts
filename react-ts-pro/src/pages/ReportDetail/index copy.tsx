import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

const ReportDetail: React.FC = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [isDrawerPinned, setIsDrawerPinned] = useState(true);
    const [notes, setNotes] = useState([
        { id: 1, content: "IKEA and Nike", isIgnored: false },
        { id: 2, content: "IKEA and Nike", isIgnored: false },
        { id: 3, content: "IKEA and Nike", isIgnored: false }
        // 更多数据可继续补充
    ]);

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
        setNotes(items.map((item, index) => ({ ...item, id: index + 1 })));
    };

    const handleCheckboxChange = (index: number) => {
        setNotes(prevNotes => {
            const newNotes = [...prevNotes];
            newNotes[index].isIgnored = !newNotes[index].isIgnored;
            return newNotes;
        });
    };

    return (
        <div className="flex">
            {/* Header */}
            {/* <header className="bg-gray-50 p-4 flex justify-between items-center">
                <Link to="/home" className="text-gray-800">
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                </Link>
                <div className="text-2xl font-bold">Quill</div>
                <div className="flex items-center">
                    <Avatar src="your-avatar-url" />
                    <span className="ml-2">Joanna</span>
                </div>
            </header> */}

            {/* Drawer */}
            <Drawer
                open={isDrawerOpen || isDrawerPinned}
                onMouseEnter={handleDrawerToggle}
                onMouseLeave={handleDrawerToggle}
                className={`${isDrawerPinned ? 'w-64' : 'w-0 transition-all duration-300'} bg-gray-100 p-4`}
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

                <TableContainer component={Paper} className="border border-[#DC2F20] overflow-auto">
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="border border-[#DC2F20]">Paragraph NO.</TableCell>
                                <TableCell className="border border-[#DC2F20]">Ignore</TableCell>
                                <TableCell className="border border-[#DC2F20]"></TableCell>
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
                                                        className="hover:bg-gray-200"
                                                    >
                                                        <TableCell className="border border-[#DC2F20]">{note.isIgnored ? '' : note.id}</TableCell>
                                                        <TableCell className="border border-[#DC2F20]">
                                                            <input
                                                                type="checkbox"
                                                                checked={note.isIgnored}
                                                                onChange={() => handleCheckboxChange(index)}
                                                            />
                                                        </TableCell>
                                                        <TableCell className="border border-[#DC2F20]">{note.content}</TableCell>
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
            </Drawer>

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