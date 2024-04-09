const EmoticonPicker = ({ onEmoticonSelect }: { onEmoticonSelect: any }) => {
    const emoticons = ['😊', '😄', '😁', '😆', '😂']; // Các biểu tượng cảm xúc

    const handleEmoticonSelect = (emoticon) => {
        onEmoticonSelect(emoticon);
    };

    return (
        <div className="emoticon-picker">
            {emoticons.map((emoticon, index) => (
                <span key={index} onClick={() => handleEmoticonSelect(emoticon)}>
                    {emoticon}
                </span>
            ))}
        </div>
    );
};