import { Document, Model } from 'mongoose';

interface IMonthData {
  month: string;
  count: number;
}

export async function generateFullYearData<T extends Document>(
  model: Model<T>,
): Promise<{ last12Months: IMonthData[] }> {
  const last12Months: IMonthData[] = [];
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  for (let i = 0; i < 12; i++) {
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1,
    );

    const monthYear = endDate.toLocaleString('default', {
      month: 'short',
      year: 'numeric',
    });

    const count = await model.countDocuments({
      createdAt: {
        $gte: new Date(endDate.getFullYear(), endDate.getMonth(), 1),
        $lt: new Date(endDate.getFullYear(), endDate.getMonth() + 1, 1),
      },
    });

    last12Months.push({ month: monthYear, count });
  }
  return { last12Months };
}
