const Footer = ({ completedTasksCount = 0, activeTasksCount = 0 }) => {
  return (
    <>
      {completedTasksCount + activeTasksCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTasksCount > 0 && (
              <>
                🎉 Tuyệt vời! Bạn đã hoàn thành {completedTasksCount} nhiệm vụ
                {activeTasksCount > 0 &&
                  ` và còn ${activeTasksCount} nhiệm vụ đang chờ xử lý`}
              </>
            )}
            {completedTasksCount === 0 && activeTasksCount > 0 && (
              <>Hãy bắt đầu làm {activeTasksCount} nhiệm vụ</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
