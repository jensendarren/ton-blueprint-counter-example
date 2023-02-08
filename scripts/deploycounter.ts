import { toNano } from 'ton-core';
import { counter } from '../wrappers/counter';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const counter = counter.createFromConfig(
        {
            id: Math.floor(Math.random() * 10000),
            counter: 0,
        },
        await compile('counter')
    );

    await provider.deploy(counter, toNano('0.05'));

    const openedContract = provider.open(counter);

    console.log('ID', await openedContract.getID());
}
